json.extract! book, :id, :rlevel, :lslevel, :age, :category, :names, :quantity, :links, :audio, :rcomments, :bcomments, :created_at, :updated_at
json.url book_url(book, format: :json)
