#!/bin/bash
set -e

# Configuration
SERVER_USER="ubuntu"
SERVER_HOST="ec2-43-205-118-245.ap-south-1.compute.amazonaws.com"
SERVER_PATH="/home/ubuntu/valamanaalandur"
SSH_KEY="$HOME/.ssh/minsky-aws.pem"

echo "[START] Starting deployment to production..."

# === 1. Sync code to server ===
echo "[...] Syncing files to server..."
rsync -avz --progress \
	--exclude 'node_modules' \
	--exclude '.next' \
	--exclude '.turbo' \
	--exclude 'dist' \
	--exclude '.env.local' \
	--exclude '.git' \
	--exclude '*.log' \
	--exclude '.DS_Store' \
	--exclude 'pnpm-lock.yaml' \
	--exclude 'packages/payload/src/migrations' \
	--exclude notes.md \
	-e "ssh -i $SSH_KEY" \
	./ ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/

echo "[SUCCESS] Files synced successfully!"
