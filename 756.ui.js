"use strict";(self.webpackChunkedumips64_webui=self.webpackChunkedumips64_webui||[]).push([[756,603],{2603:(e,r,s)=>{s.r(r),s.d(r,{DraggedTreeItemsIdentifier:()=>t,TreeViewsDnDService:()=>i});class i{constructor(){this._dragOperations=new Map}removeDragOperationTransfer(e){if(e&&this._dragOperations.has(e)){const r=this._dragOperations.get(e);return this._dragOperations.delete(e),r}}}class t{constructor(e){this.identifier=e}}},6756:(e,r,s)=>{s.r(r),s.d(r,{ITreeViewsDnDService:()=>a});var i=s(6726),t=s(2399),n=s(2603);const a=(0,t.u1)("treeViewsDndService");(0,i.v)(a,n.TreeViewsDnDService,1)}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNzU2LnVpLmpzIiwibWFwcGluZ3MiOiJnTUFJTyxNQUFNQSxFQUNULFdBQUFDLEdBQ0lDLEtBQUtDLGdCQUFrQixJQUFJQyxHQUMvQixDQUNBLDJCQUFBQyxDQUE0QkMsR0FDeEIsR0FBS0EsR0FBUUosS0FBS0MsZ0JBQWdCSSxJQUFJRCxHQUFRLENBQzFDLE1BQU1FLEVBQVlOLEtBQUtDLGdCQUFnQk0sSUFBSUgsR0FFM0MsT0FEQUosS0FBS0MsZ0JBQWdCTyxPQUFPSixHQUNyQkUsQ0FDWCxDQUVKLEVBRUcsTUFBTUcsRUFDVCxXQUFBVixDQUFZVyxHQUNSVixLQUFLVSxXQUFhQSxDQUN0QixFLDhGQ2JHLE1BQU1DLEdBQXVCLFFBQWdCLHdCQUNwRCxPQUFrQkEsRUFBc0IsRUFBQWIsb0JBQXFCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZHVtaXBzNjQtd2VidWkvLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvZWRpdG9yL2NvbW1vbi9zZXJ2aWNlcy90cmVlVmlld3NEbmQuanMiLCJ3ZWJwYWNrOi8vZWR1bWlwczY0LXdlYnVpLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9jb21tb24vc2VydmljZXMvdHJlZVZpZXdzRG5kU2VydmljZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCBjbGFzcyBUcmVlVmlld3NEbkRTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fZHJhZ09wZXJhdGlvbnMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIHJlbW92ZURyYWdPcGVyYXRpb25UcmFuc2Zlcih1dWlkKSB7XG4gICAgICAgIGlmICgodXVpZCAmJiB0aGlzLl9kcmFnT3BlcmF0aW9ucy5oYXModXVpZCkpKSB7XG4gICAgICAgICAgICBjb25zdCBvcGVyYXRpb24gPSB0aGlzLl9kcmFnT3BlcmF0aW9ucy5nZXQodXVpZCk7XG4gICAgICAgICAgICB0aGlzLl9kcmFnT3BlcmF0aW9ucy5kZWxldGUodXVpZCk7XG4gICAgICAgICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIERyYWdnZWRUcmVlSXRlbXNJZGVudGlmaWVyIHtcbiAgICBjb25zdHJ1Y3RvcihpZGVudGlmaWVyKSB7XG4gICAgICAgIHRoaXMuaWRlbnRpZmllciA9IGlkZW50aWZpZXI7XG4gICAgfVxufVxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyByZWdpc3RlclNpbmdsZXRvbiB9IGZyb20gJy4uLy4uLy4uL3BsYXRmb3JtL2luc3RhbnRpYXRpb24vY29tbW9uL2V4dGVuc2lvbnMuanMnO1xuaW1wb3J0IHsgY3JlYXRlRGVjb3JhdG9yIH0gZnJvbSAnLi4vLi4vLi4vcGxhdGZvcm0vaW5zdGFudGlhdGlvbi9jb21tb24vaW5zdGFudGlhdGlvbi5qcyc7XG5pbXBvcnQgeyBUcmVlVmlld3NEbkRTZXJ2aWNlIH0gZnJvbSAnLi90cmVlVmlld3NEbmQuanMnO1xuZXhwb3J0IGNvbnN0IElUcmVlVmlld3NEbkRTZXJ2aWNlID0gY3JlYXRlRGVjb3JhdG9yKCd0cmVlVmlld3NEbmRTZXJ2aWNlJyk7XG5yZWdpc3RlclNpbmdsZXRvbihJVHJlZVZpZXdzRG5EU2VydmljZSwgVHJlZVZpZXdzRG5EU2VydmljZSwgMSAvKiBJbnN0YW50aWF0aW9uVHlwZS5EZWxheWVkICovKTtcbiJdLCJuYW1lcyI6WyJUcmVlVmlld3NEbkRTZXJ2aWNlIiwiY29uc3RydWN0b3IiLCJ0aGlzIiwiX2RyYWdPcGVyYXRpb25zIiwiTWFwIiwicmVtb3ZlRHJhZ09wZXJhdGlvblRyYW5zZmVyIiwidXVpZCIsImhhcyIsIm9wZXJhdGlvbiIsImdldCIsImRlbGV0ZSIsIkRyYWdnZWRUcmVlSXRlbXNJZGVudGlmaWVyIiwiaWRlbnRpZmllciIsIklUcmVlVmlld3NEbkRTZXJ2aWNlIl0sInNvdXJjZVJvb3QiOiIifQ==