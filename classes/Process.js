const { spawn } = require('child_process');

const PROCESS_STATUSES = {
    COMPLETED: "completed",
    FAILED: "failed",
    IN_PROGRESS: "progress"
}

function RunProcess(scriptPath, args, isNeedConfirmation = false) {
    return new Promise((resolve, reject) => {
        let status = PROCESS_STATUSES.IN_PROGRESS;

        // Spawn the child process
        const child = spawn(scriptPath, args);

        // Handle script's stderr output (if any errors occur)
        child.stderr.on('data', (data) => {
            console.error(`Script stderr: ${data}`);
            reject(PROCESS_STATUSES.FAILED);

        });

        // Listen for script's request for input
        child.stdout.on('data', (data) => {
            if (isNeedConfirmation) {
                // Check if the output contains "Y/n" and respond with 'y'
                if (data.toString().includes('[y/N]')) {
                    child.stdin.write('y');
                    child.stdin.end()
                }
            }
            console.log(`Script stdout: ${data}`);
        });

        // Handle script termination
        child.on('close', (code) => {
            console.log(`Child process exited with code ${code}`);
            if (!child.killed) {
                child.kill();
            }
            resolve(PROCESS_STATUSES.COMPLETED);
        });
    });
}

module.exports = { RunProcess };