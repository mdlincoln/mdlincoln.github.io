# Plugin to validate the YAML headers of lesson pages.
# Inspired by a very useful answer from Christian: http://stackoverflow.com/a/43909411/3547541

module MyModule

  class WarningGenerator < Jekyll::Generator
    def generate(site)

      # Empty array to collect all errors across the site
      total_errors = Array.new

      # ANSI codes to color the warnings red
      red = "\e[31m"
      clear = "\e[0m"

      valid_tags = site.pages.keep_if{|p| p.data["layout"] == "taglist" }.map{|p| p.data["tagname"]}.map{|s| s.downcase}

      site.posts.docs.each do |p|

        page_errors = Array.new

        # For each required field, check if it is missing on the page. If so, log an error.
        required_fields = ["title", "date", "tags", "layout"]

        required_fields.each do |f|
          if p.data[f].nil?
            page_errors.push("'#{f}' is missing.")
          end
        end

        post_tags = p.data["tags"]

        # Check if the tags on a post belong to the valid 
        post_tags.each do |t|
          unless valid_tags.include?(t.downcase)
            page_errors.push("'#{t}' is not a valid tag.")
          end
        end   

        unless page_errors.empty?
          # Throw a warning with the filename
          warn "#{red}In #{p.path}:#{clear}"
          
          # Add some formatting to the errors and then throw them
          unit_errors = page_errors.map{|e| "\t - #{e}"}

          unit_errors.each do |e|
            warn "#{red}#{e}#{clear}"
          end

          # Finally, add all errors on the page to the master error list
          total_errors.concat(page_errors)
        end
      end

      # Iff there were page errors, raise an exception that will halt the build
      unless total_errors.empty?
        raise "#{red}There were YAML errors.#{clear}"
      end
    end
  end
end
