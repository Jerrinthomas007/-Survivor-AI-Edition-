import bcrypt

# Your bcrypt hash
hashed = b"$2b$12$1Oc27KraMfFp9r/5O/OsrOUNshpK8vfkQBwRPWY8jhqve0E3u6FPK"

# Password to check
password = b"5"

# Verify password
if bcrypt.checkpw(password, hashed):
    print("Password matches!")
else:
    print("Password does NOT match.")
