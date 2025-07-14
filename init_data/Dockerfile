# Use the official Python image as a base
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    ENV=prod

# Set working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy the dependency file
COPY requirements.txt .

# Install Python dependencies
RUN pip install -r requirements.txt

# Copy the entire app
COPY src/ .

# Command to run the app using uvicorn
CMD ["python3", "data_setup.py"]
