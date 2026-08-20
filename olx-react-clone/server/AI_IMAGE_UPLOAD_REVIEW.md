# Task 5 - AI-assisted image upload review

The `/upload` route uses Multer to accept one image from a form-data field named `image`.

Security improvement added before using the sample in this OLX clone:
- Limit each upload to 2 MB.
- Allow only `image/jpeg`, `image/png`, and `image/webp` MIME types.
- Generate a random server-side filename instead of trusting the original filename.

For a real production OLX-style app, also scan uploaded files, verify actual file signatures (not only MIME headers), store files in a managed object-storage service, and protect upload routes with authentication/rate limiting.
