import { spawn } from 'node:child_process';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const server = spawn(npmCommand, ['--prefix', 'server', 'run', 'dev'], {
  stdio: 'inherit',
  shell: false
});

const client = spawn(npmCommand, ['--prefix', 'client', 'run', 'dev'], {
  stdio: 'inherit',
  shell: false
});

function shutdown() {
  server.kill('SIGTERM');
  client.kill('SIGTERM');
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

server.on('exit', (code) => {
  if (code && code !== 0) console.error(`Server exited with code ${code}`);
});

client.on('exit', (code) => {
  if (code && code !== 0) console.error(`Client exited with code ${code}`);
});
