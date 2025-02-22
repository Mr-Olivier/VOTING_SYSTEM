# #!/bin/bash

# # Commit each modified file individually
# git add commit.sh
# git commit -m "Update commit.sh"

# git add src/components/common/Navbar.tsx
# git commit -m "Update Navbar component"

# git add src/components/dashboard/DashboardHeader.tsx
# git commit -m "Update DashboardHeader component"

# git add src/features/auth/authSlice.ts
# git commit -m "Update authSlice"

# git add src/features/auth/components/Login.tsx
# git commit -m "Update Login component"

# git add src/features/auth/components/RegNoCheck.tsx
# git commit -m "Update RegNoCheck component"

# git add src/index.css
# git commit -m "Update index.css"

# git add src/layouts/DashboardLayout.tsx
# git commit -m "Update DashboardLayout"

# git add src/types/auth.ts
# git commit -m "Update auth types"

# # Commit each untracked file individually
# git add src/components/common/AccessibilityControls.tsx
# git commit -m "Add AccessibilityControls component"

# git add src/components/home/ContactAdmin.tsx
# git commit -m "Add ContactAdmin component"

# git add src/hooks/useReaderMode.ts
# git commit -m "Add useReaderMode hook"

# echo "All changes committed one by one."





#!/bin/bash

# Function to generate conventional commit message
generate_commit_message() {
    local file="$1"
    local type=""
    local message=""

    case "$file" in
        README.md)
            type="docs"
            message="add README file"
            ;;
        src/components/common/AccessibilityControls.tsx)
            type="feat"
            message="add AccessibilityControls component"
            ;;
        .gitignore)
            type="chore"
            message="add gitignore file"
            ;;
        commit.sh)
            type="chore"
            message="add commit script"
            ;;
        eslint.config.js)
            type="chore"
            message="add ESLint configuration"
            ;;
        "folder-structure .txt")
            type="docs"
            message="add folder structure documentation"
            ;;
        generate-icons.bat|iconGennerate.sh)
            type="chore"
            message="add icon generation script"
            ;;
        index.html)
            type="feat"
            message="add main HTML file"
            ;;
        manifest.json)
            type="feat"
            message="add web app manifest"
            ;;
        package.json|package-lock.json)
            type="chore(deps)"
            message="initialize project dependencies"
            ;;
        postcss.config.js)
            type="chore"
            message="add PostCSS configuration"
            ;;
        public/*)
            type="feat"
            message="add public assets"
            ;;
        src/App.css)
            type="feat"
            message="add main application styles"
            ;;
        src/App.tsx)
            type="feat"
            message="add main App component"
            ;;
        src/assets/*)
            type="feat"
            message="add asset files"
            ;;
        src/components/common/*.tsx)
            type="feat"
            message="add ${file##*/} component"
            ;;
        *)
            type="chore"
            message="add ${file##*/}"
            ;;
    esac

    echo "${type}: ${message}"
}

# Function to check if git repository
check_git_repo() {
    if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
        echo "Error: Not a git repository. Please initialize git first."
        exit 1
    fi
}

# Function to commit and push changes
commit_and_push_changes() {
    check_git_repo

    # Staged files
    staged_files=(
        "README.md"
        "src/components/common/AccessibilityControls.tsx"
    )

    # Untracked files
    untracked_files=(
        ".gitignore"
        "commit.sh"
        "eslint.config.js"
        "folder-structure .txt"
        "generate-icons.bat"
        "iconGennerate.sh"
        "index.html"
        "manifest.json"
        "package-lock.json"
        "package.json"
        "postcss.config.js"
        "public"
        "src/App.css"
        "src/App.tsx"
        "src/assets"
        "src/components/common/AdminRoute.tsx"
        "src/components/common/Footer.tsx"
        "src/components/common/LoadingSpinner.tsx"
        "src/components/common/Navbar.tsx"
        "src/components/common/PrivateRoute.tsx"
        "src/components/common/ScrollProgress.tsx"
        "src/components/common/Sidebar.tsx"
    )

    # Process staged files
    for file in "${staged_files[@]}"; do
        if [ -f "$file" ] || [ -d "$file" ]; then
            commit_message=$(generate_commit_message "$file")
            git commit -m "$commit_message" "$file"
            echo "Committed staged file: $file with message - $commit_message"
        fi
    done

    # Process untracked files
    for file in "${untracked_files[@]}"; do
        if [ -f "$file" ] || [ -d "$file" ]; then
            commit_message=$(generate_commit_message "$file")
            git add "$file"
            git commit -m "$commit_message"
            echo "Committed new file: $file with message - $commit_message"
        else
            echo "Warning: Untracked file $file does not exist"
        fi
    done

    # Push all changes
    git push origin main
    echo "All changes have been committed and pushed successfully!"
}

# Run the function
commit_and_push_changes
