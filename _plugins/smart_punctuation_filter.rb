module Jekyll
  module ReplaceSmartPunctuation
    def self.replace_smart_punctuation(input)
      return input unless input.is_a?(String)

      replacements = {
        "\u2018" => "'",  # Left single quotation mark
        "\u2019" => "'",  # Right single quotation mark
        "\u201C" => '"',  # Left double quotation mark
        "\u201D" => '"',  # Right double quotation mark
        "\u2013" => "-",  # En dash
        "\u2014" => "-",  # Em dash
        "\u2026" => "...", # Ellipsis
      }

      # Replace each smart punctuation character with its ASCII equivalent
      replacements.each do |smart, ascii|
        input = input.gsub(smart, ascii)
      end

      input
    end
  end
end

# Register hook for posts and pages only
Jekyll::Hooks.register [:posts], :post_render do |document|
  if document.respond_to?(:data) &&
     document.respond_to?(:content) &&
     document.data['layout'] == 'post' &&
     document.content.is_a?(String)
    document.content = Jekyll::ReplaceSmartPunctuation.replace_smart_punctuation(document.content)
  end
end
