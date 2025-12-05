#!/bin/bash

echo "Starting the Auto Shop!"
echo "Starting Frontend..."

FRONTEND_DIR="./frontend"

if [ -d "$FRONTEND_DIR" ]; then
    cd "$FRONTEND_DIR" || exit
    echo "Installing frontend dependencies..."
    npm install

    echo "Running frontend..."

    npm run dev &
    FRONTEND_PID=$!
else
    echo "Frontend directory not found!"
fi

echo "Starting Backend..."

BACKEND_DIR="../backend"

if [ -d "$BACKEND_DIR" ]; then
    cd "$BACKEND_DIR" || exit

    if [ ! -d "venv" ]; then
        echo "Creating Python virtual environment..."
        python3 -m venv venv || python -m venv venv
    fi

    echo "Activating virtual environment..."
    source ./venv/bin/activate 2>/dev/null || source ./venv/Scripts/activate

    echo "Installing backend dependencies..."
    pip install -r requirements.txt

    echo "Running backend..."
    python app.py &
    BACKEND_PID=$!
else
    echo "Backend directory not found!"
fi

echo "Both frontend and backend are starting!"
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:8000"

wait $FRONTEND_PID $BACKEND_PID