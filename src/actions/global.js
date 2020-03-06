export const setRehydrateCompleted = () => ({
  type: 'global/REHYDRATE_COMPLETED',
});

export const setGlobalDrawerStatus = drawerStatus => ({
  type: 'global/SET_GLOBAL_DRAWER_STATUS',
  drawerStatus,
});
