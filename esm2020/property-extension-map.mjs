import { MapleColorHelper } from './helpers/color.helper';
export const MAPLE_PROP_EXTENSION_MAP = {
    'margin-x': (val, important) => `margin-left:${val} ${important};margin-right:${val} ${important};`,
    'margin-y': (val, important) => `margin-top:${val} ${important};margin-bottom:${val} ${important};`,
    'padding-x': (val, important) => `padding-left:${val} ${important};padding-right:${val} ${important};`,
    'padding-y': (val, important) => `padding-top:${val} ${important};padding-bottom:${val} ${important};`,
    link: (val, important) => `
    color:${val} ${important};
  `,
    theme: (val, important) => `
    background-color:${val} ${important};
    border-color:${val} ${important};
    color:${MapleColorHelper.getContrastColor(val)} ${important};
  `,
    'theme-outline': (val, important) => `
    background-color: ${MapleColorHelper.getContrastColor(val)} ${important};
    border-color:${val} ${important};
    color:${val} ${important};
  `,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHktZXh0ZW5zaW9uLW1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvcmUvc3JjL3Byb3BlcnR5LWV4dGVuc2lvbi1tYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFMUQsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQUc7SUFDdEMsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQzdCLGVBQWUsR0FBRyxJQUFJLFNBQVMsaUJBQWlCLEdBQUcsSUFBSSxTQUFTLEdBQUc7SUFDckUsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQzdCLGNBQWMsR0FBRyxJQUFJLFNBQVMsa0JBQWtCLEdBQUcsSUFBSSxTQUFTLEdBQUc7SUFDckUsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQzlCLGdCQUFnQixHQUFHLElBQUksU0FBUyxrQkFBa0IsR0FBRyxJQUFJLFNBQVMsR0FBRztJQUN2RSxXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FDOUIsZUFBZSxHQUFHLElBQUksU0FBUyxtQkFBbUIsR0FBRyxJQUFJLFNBQVMsR0FBRztJQUN2RSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQztZQUNoQixHQUFHLElBQUksU0FBUztHQUN6QjtJQUNELEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDO3VCQUNOLEdBQUcsSUFBSSxTQUFTO21CQUNwQixHQUFHLElBQUksU0FBUztZQUN2QixnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxTQUFTO0dBQzVEO0lBQ0QsZUFBZSxFQUFFLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUM7d0JBQ2YsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksU0FBUzttQkFDeEQsR0FBRyxJQUFJLFNBQVM7WUFDdkIsR0FBRyxJQUFJLFNBQVM7R0FDekI7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFwbGVDb2xvckhlbHBlciB9IGZyb20gJy4vaGVscGVycy9jb2xvci5oZWxwZXInO1xuXG5leHBvcnQgY29uc3QgTUFQTEVfUFJPUF9FWFRFTlNJT05fTUFQID0ge1xuICAnbWFyZ2luLXgnOiAodmFsLCBpbXBvcnRhbnQpID0+XG4gICAgYG1hcmdpbi1sZWZ0OiR7dmFsfSAke2ltcG9ydGFudH07bWFyZ2luLXJpZ2h0OiR7dmFsfSAke2ltcG9ydGFudH07YCxcbiAgJ21hcmdpbi15JzogKHZhbCwgaW1wb3J0YW50KSA9PlxuICAgIGBtYXJnaW4tdG9wOiR7dmFsfSAke2ltcG9ydGFudH07bWFyZ2luLWJvdHRvbToke3ZhbH0gJHtpbXBvcnRhbnR9O2AsXG4gICdwYWRkaW5nLXgnOiAodmFsLCBpbXBvcnRhbnQpID0+XG4gICAgYHBhZGRpbmctbGVmdDoke3ZhbH0gJHtpbXBvcnRhbnR9O3BhZGRpbmctcmlnaHQ6JHt2YWx9ICR7aW1wb3J0YW50fTtgLFxuICAncGFkZGluZy15JzogKHZhbCwgaW1wb3J0YW50KSA9PlxuICAgIGBwYWRkaW5nLXRvcDoke3ZhbH0gJHtpbXBvcnRhbnR9O3BhZGRpbmctYm90dG9tOiR7dmFsfSAke2ltcG9ydGFudH07YCxcbiAgbGluazogKHZhbCwgaW1wb3J0YW50KSA9PiBgXG4gICAgY29sb3I6JHt2YWx9ICR7aW1wb3J0YW50fTtcbiAgYCxcbiAgdGhlbWU6ICh2YWwsIGltcG9ydGFudCkgPT4gYFxuICAgIGJhY2tncm91bmQtY29sb3I6JHt2YWx9ICR7aW1wb3J0YW50fTtcbiAgICBib3JkZXItY29sb3I6JHt2YWx9ICR7aW1wb3J0YW50fTtcbiAgICBjb2xvcjoke01hcGxlQ29sb3JIZWxwZXIuZ2V0Q29udHJhc3RDb2xvcih2YWwpfSAke2ltcG9ydGFudH07XG4gIGAsXG4gICd0aGVtZS1vdXRsaW5lJzogKHZhbCwgaW1wb3J0YW50KSA9PiBgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtNYXBsZUNvbG9ySGVscGVyLmdldENvbnRyYXN0Q29sb3IodmFsKX0gJHtpbXBvcnRhbnR9O1xuICAgIGJvcmRlci1jb2xvcjoke3ZhbH0gJHtpbXBvcnRhbnR9O1xuICAgIGNvbG9yOiR7dmFsfSAke2ltcG9ydGFudH07XG4gIGAsXG59O1xuIl19