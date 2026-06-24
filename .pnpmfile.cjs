// pnpm overrides — disable build scripts for native modules that fail
// to compile on Node 20's bundled gyp. They're only used as fallbacks
// (the app falls back to fs.watch which is built into Node).
module.exports = {
  overrides: {
    'inotify@1.4.6': {
      // Force the install hook to do nothing — the pre-built binary in
      // the tarball works for most use cases, and our apps don't need
      // the native inotify watcher.
      'hooks:preinstall': 'echo skipping inotify preinstall',
      'hooks:install': 'echo skipping inotify install',
    },
  },
};
