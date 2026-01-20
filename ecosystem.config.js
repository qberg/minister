module.exports = {
  apps: [
    {
      name: "web",
      cwd: "./apps/web",
      script: ".next/standalone/apps/web/server.js",

      // === Clustering ===
      instances: "max",
      exec_mode: "cluster",

      // === Environment ===
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
        NODE_OPTIONS: "--max-old-space-size=768",
        PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
      },

      // === Memory & Restart ===
      max_memory_restart: "1024M",
      max_restarts: 10,
      min_uptime: "10s",
      restart_delay: 4000,

      kill_timeout: 10_000,
      wait_ready: true,
      listen_timeout: 10_000,

      // === Logging ===
      error_file: "/var/log/pm2/web-error.log",
      out_file: "/var/log/pm2/web-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      merge_logs: true,

      // === Behavior ===
      autorestart: true,
      watch: false,
      exp_backoff_restart_delay: 100,

      instance_var: "INSTANCE_ID",
      cron_restart: "0 4 * * *",
    },
  ],
};
