# Security Fix TODO List

## Status: COMPLETED ✅

- [x] Understand the issue and analyze root cause
- [x] Get user approval for the plan
- [x] Create RegisterRequest Form Request class
- [x] Create LoginRequest Form Request class
- [x] Fix AuthController to use Form Requests
- [x] Update frontend to match backend requirements
- [x] Fix JWT cookie middleware for API routes
- [x] Fix user data response structure in Home.jsx

## Implementation Details

### Issue:
The developer incorrectly used `$request->input(key: 'name|required|string|max:25')` which returns null because the input key is wrong. This caused:
- SQL integrity constraint violation (name cannot be null)
- Complete bypass of validation (security vulnerability)

### Solution:
1. Create proper Form Request classes with validation rules
2. Use Laravel's Form Request validation
3. Add secure error handling

