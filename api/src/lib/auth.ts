export const USER_ROLES = ["CLIENT", "FREELANCER", "ADMIN"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const isUserRole = (value: string): value is UserRole =>
  USER_ROLES.includes(value as UserRole);
