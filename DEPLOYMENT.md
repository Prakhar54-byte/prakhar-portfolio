# 🚀 Deployment Guide for Prakhar's Portfolio

This guide covers two deployment methods: **Vercel** (recommended for simplicity) and **Docker** (for more control).

---

## 📋 Pre-requisites

Before deploying, make sure:

1. Your code is pushed to GitHub
2. The build works locally:
   ```bash
   npm run build
   npm run preview
   ```

---

## 🔺 Method 1: Deploy with Vercel (Recommended)

Vercel is the easiest way to deploy React/Vite apps. It's free for personal projects!

### Step 1: Push to GitHub

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Portfolio ready for deployment"

# Add your GitHub repo as remote
git remote add origin https://github.com/Prakhar54-byte/prakhar-portfolio.git

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy on Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign up with GitHub

2. **Click "Add New Project"**

3. **Import your GitHub repository** (prakhar-portfolio)

4. **Configure the project:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Click "Deploy"** 🎉

6. Your site will be live at: `https://prakhar-portfolio.vercel.app`

### Step 3: Custom Domain (Optional)

1. Go to your project settings on Vercel
2. Click "Domains"
3. Add your custom domain (e.g., `prakhar.dev`)
4. Follow DNS configuration instructions

### Automatic Deployments

Every time you push to GitHub, Vercel automatically deploys!

```bash
git add .
git commit -m "Update portfolio"
git push
# Vercel deploys automatically!
```

---

## 🐳 Method 2: Deploy with Docker

Docker gives you more control and works anywhere (AWS, DigitalOcean, your own server).

### Step 1: Install Docker

**On Ubuntu/Linux:**
```bash
# Update packages
sudo apt update

# Install Docker
sudo apt install docker.io docker-compose -y

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add yourself to docker group (optional, to run without sudo)
sudo usermod -aG docker $USER
```

**On Mac:**
Download Docker Desktop from [docker.com](https://docker.com)

**On Windows:**
Download Docker Desktop from [docker.com](https://docker.com)

### Step 2: Build Docker Image

```bash
# Navigate to project directory
cd /home/prakhar/Downloads/portfolie/prakhar-portfolio

# Build the Docker image
docker build -t prakhar-portfolio .

# This will:
# 1. Install dependencies
# 2. Build the React app
# 3. Create an optimized nginx image
```

### Step 3: Run the Container

```bash
# Run the container
docker run -d -p 80:80 --name portfolio prakhar-portfolio

# Your site is now live at http://localhost
```

### Step 4: Useful Docker Commands

```bash
# View running containers
docker ps

# Stop the container
docker stop portfolio

# Start the container
docker start portfolio

# Remove the container
docker rm portfolio

# View logs
docker logs portfolio

# Rebuild after changes
docker build -t prakhar-portfolio . && docker run -d -p 80:80 --name portfolio prakhar-portfolio
```

### Step 5: Deploy to Cloud with Docker

#### Option A: Deploy to DigitalOcean

1. Create a Droplet (Ubuntu)
2. SSH into your server:
   ```bash
   ssh root@your-server-ip
   ```
3. Install Docker:
   ```bash
   apt update && apt install docker.io -y
   ```
4. Clone your repo and build:
   ```bash
   git clone https://github.com/Prakhar54-byte/prakhar-portfolio.git
   cd prakhar-portfolio
   docker build -t portfolio .
   docker run -d -p 80:80 portfolio
   ```

#### Option B: Deploy to AWS EC2

1. Launch an EC2 instance (Ubuntu)
2. SSH into instance
3. Install Docker and run same commands as above

#### Option C: Deploy to Docker Hub

```bash
# Login to Docker Hub
docker login

# Tag your image
docker tag prakhar-portfolio prakhar54/portfolio:latest

# Push to Docker Hub
docker push prakhar54/portfolio:latest

# Now anyone can run your portfolio:
# docker run -d -p 80:80 prakhar54/portfolio:latest
```

---

## 🔧 Docker Compose (Advanced)

For more complex setups, use Docker Compose:

```yaml
# docker-compose.yml
version: '3.8'
services:
  portfolio:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

---

## 📊 Comparison: Vercel vs Docker

| Feature | Vercel | Docker |
|---------|--------|--------|
| Ease of use | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Free tier | ✅ Generous | ❌ Need server |
| Custom domain | ✅ Easy | ✅ Manual setup |
| Auto-deploy | ✅ Built-in | ❌ Need CI/CD |
| Scalability | ✅ Automatic | ✅ Full control |
| SSL/HTTPS | ✅ Automatic | ❌ Manual setup |
| Best for | Personal projects | Production apps |

---

## 🎯 Quick Start Commands

### Vercel (Fastest)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts, done!
```

### Docker (Local)
```bash
docker build -t portfolio . && docker run -d -p 80:80 portfolio
```

---

## ❓ Troubleshooting

### Build fails on Vercel
- Check if `npm run build` works locally
- Ensure all dependencies are in `package.json`
- Check Vercel build logs

### Docker image too large
- The multi-stage Dockerfile keeps image small (~25MB)
- Use `docker images` to check size

### Port 80 in use
```bash
# Use a different port
docker run -d -p 3000:80 portfolio
# Access at http://localhost:3000
```

---

## 🎉 You're Ready!

Your portfolio is now deployment-ready. Choose the method that suits you:

- **Vercel**: Quick, free, automatic - perfect for portfolios
- **Docker**: More control, works anywhere - great for learning DevOps

Good luck with your deployment! 🚀
