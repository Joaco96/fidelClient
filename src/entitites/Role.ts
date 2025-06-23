export enum RoleIds{
  USER = 1,
  EMPLOYEE = 2,
  ADMIN = 3,
}

export const roleNames: Record<string, string> = {
  [RoleIds.USER]: "Usuario",
  [RoleIds.EMPLOYEE]: "Empleado",
  [RoleIds.ADMIN]: "Administrador",
}

export const roles: {id: string, name: string}[] = [
  {
    id: RoleIds.USER.toString(),
    name: roleNames[RoleIds.USER],
  },
  {
    id: RoleIds.EMPLOYEE.toString(),
    name: roleNames[RoleIds.EMPLOYEE],
  },
  {
    id: RoleIds.ADMIN.toString(),
    name: roleNames[RoleIds.ADMIN],
  },
]