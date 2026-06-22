from fastapi import HTTPException


class FileTooLargeError(HTTPException):
    def __init__(self, max_mb: int):
        super().__init__(
            status_code=413,
            detail=f"File is too large. Maximum allowed size is {max_mb}MB."
        )


class InvalidFileTypeError(HTTPException):
    def __init__(self, expected: str = "PDF"):
        super().__init__(
            status_code=400,
            detail=f"Invalid file type. Only {expected} files are supported."
        )


class GroqAPIError(HTTPException):
    def __init__(self, message: str = "AI summarization failed"):
        super().__init__(
            status_code=503,
            detail=f"AI service error: {message}. Please try again."
        )


class TextTooShortError(HTTPException):
    def __init__(self, min_chars: int = 50):
        super().__init__(
            status_code=400,
            detail=f"Text is too short. Please provide at least {min_chars} characters."
        )
