import crypto from "crypto";

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return { hash, salt }; // salt is stored on the user database
}

export function verifyPassword({
  canditatePassword,
  salt,
  hash,
}: {
  canditatePassword: string;
  salt: string;
  hash: string;
}) {
  const candidateHash = crypto
    .pbkdf2Sync(canditatePassword, salt, 1000, 64, "sha512")
    .toString("hex");
  return candidateHash == hash; //verifying that the user password is correct
}
