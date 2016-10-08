'use strict';

import gulp     from 'gulp';
import path     from 'path';
import rename   from 'gulp-rename';
import template from 'gulp-template';
import yargs    from 'yargs';

let root = '_client';

// helper method for resolving paths
let resolveToApp = (glob = '') => {
  return path.join('_client', glob); // app/{glob}
};

let resolveToComponents = (glob = '') => {
  return path.join('_client', glob); // app/components/{glob}
};

let paths = {
  blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
}

gulp.task('component', () => {
  const cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  const name = yargs.argv.name;
  const parentPath = yargs.argv.parent || 'components';
  const destPath = path.join(resolveToComponents(), parentPath, name);

  return gulp.src(paths.blankTemplates)
    .pipe(template({
      name: name,
      upCaseName: cap(name),
      moduleName: `app.${name}`
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});
