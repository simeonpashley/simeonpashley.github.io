module Jekyll
  module RemoveChatGPTFormatting
    # Define a method to perform regex replacements
    def self.clean_chatgpt_formatting(input)
      return input unless input.is_a?(String)

      # Array of regex replacements
      replacements = [
        # Example: Remove bold from Markdown headings
        [ /^([#]+)\s\*\*(.*?)\*\*$/, '\1 \2' ],
        # Add more replacements as needed
        # [ /regex_pattern/, 'replacement' ],
      ]

      # Apply each regex replacement
      replacements.each do |pattern, replacement|
        input = input.gsub(Regexp.new(pattern), replacement)
      end

      input
    end
  end
end

# Register hook for posts and pages only
Jekyll::Hooks.register [:pages, :posts], :post_render do |document|
  if document.respond_to?(:data) &&
     (document.data['layout'] == 'post' || document.data['layout'] == 'page') &&
     document.respond_to?(:content) &&
     document.content.is_a?(String)
    document.content = Jekyll::RemoveChatGPTFormatting.clean_chatgpt_formatting(document.content)
  end
end
