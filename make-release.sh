# Make sure our master branch is up to date
git checkout master
git pull

# Remove our former release branch
git branch -D lastest-release 2>/dev/null
git push origin --delete lastest-release 2>/dev/null

# Create a new branch to run the build under
git checkout -b lastest-release

# Ensure we have the latest version of things
rm -rf node_modules # package-lock.json <-- may want to remove this file too if it suits your project.
npm install

# Test validity
# npm test

# Build and update docs
ng build

# Collect the version number
releaseVersion=`node -e "let package = require('./package.json'); console.log(package.version)"`
releaseVersion="v$releaseVersion" # of the form vX.X.X

# Remove all files except for the ones inside dist/core
mkdir TO_DELETE
shopt -s dotglob extglob
mv !(.git) TO_DELETE
shopt -u dotglob extglob
mv TO_DELETE/projects/dist/core/** .
rm -rf TO_DELETE

# Commit dist files
git add -A && git commit -m "[BUILD] $releaseVersion"

# Make a new tag off of the latest build
git checkout master
git tag "$releaseVersion" lastest-release
git push origin "$releaseVersion"
git push origin lastest-release
