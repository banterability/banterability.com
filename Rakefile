namespace :assets do
  
  desc "Compile SCSS files into CSS stylesheets"
  task :compile_sass do
    sh "sass --update assets/sass:assets/tmp/css --style compressed --no-cache"
  end

  desc "Compile Coffeescript files into Javascript"
  task :compile_coffeescript do
    sh "coffee -o assets/tmp/js -c assets/coffee"
  end

  desc "Build single application JS/CSS files"
  task :compress_assets do
    sh "jammit -o static -c assets/jammit.yml"
  end
  
  desc "Remove temporary asset generation folders"
  task :cleanup_assets do
    sh "rm -r assets/tmp"
  end
  
  desc "Recompile and compress all assets"
  task :rebuild => [:compile_sass, :compile_coffeescript, :compress_assets, :cleanup_assets] do
    puts "Static assets rebuilt."
  end
end
