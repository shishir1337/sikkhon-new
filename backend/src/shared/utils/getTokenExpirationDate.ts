import ms from 'ms';
import { refreshJwtConfig } from '../configs/jwt.config';

/** Returns the token expiration date */
export function getTokenExpirationDate(): Date {
  const expiresInDays = 7;

  const expiresAt = addDaysFromNow(expiresInDays);

  return expiresAt;
}

/** Add amount of days from today's date */
function addDaysFromNow(days: number): Date {
  const result = new Date();
  result.setDate(result.getDate() + days);
  return result;
}
