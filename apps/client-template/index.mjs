#!/usr/bin/env node
import { execSync } from "child_process"
const templateDir = new URL(".", import.meta.url).pathname
execSync(`node ${templateDir}/scripts/create-client.mjs`, { stdio: "inherit", cwd: process.cwd() })
