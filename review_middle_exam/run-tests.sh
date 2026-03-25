#!/bin/bash

# Jest + React Testing Library - Test Runner Helper

echo "🧪 Jest & React Testing Library - Test Runner"
echo "=============================================="
echo ""

if [ -z "$1" ]; then
    echo "Usage: ./run-tests.sh [command]"
    echo ""
    echo "Commands:"
    echo "  all              Run all tests"
    echo "  watch            Run tests in watch mode"
    echo "  coverage         Run tests with coverage report"
    echo "  usermemo         Run UserPostsMemo tests"
    echo "  debug            Run tests with detailed output"
    echo ""
    exit 0
fi

case "$1" in
    all)
        echo "📌 Running all tests..."
        npm test -- --no-coverage
        ;;
    watch)
        echo "👀 Running tests in watch mode..."
        npm run test:watch
        ;;
    coverage)
        echo "📊 Running coverage report..."
        npm run test:coverage
        ;;
    usermemo)
        echo "🎯 Running UserPostsMemo tests..."
        npm test -- UserPostsMemo.test.jsx --no-coverage
        ;;
    debug)
        echo "🐛 Running tests with verbose output..."
        npm test -- --verbose --no-coverage
        ;;
    *)
        echo "❌ Unknown command: $1"
        echo "Use './run-tests.sh' to see available commands"
        exit 1
        ;;
esac
