json.array! @books do |book|
  # {"63"=>["phone,phone,teeny-tiny,flash,statuesque,toy,throat,addicted"]}
  if @field == "future_books"
    b = Book.find(book.to_i)
    json.extract! b, :id, :rlevel, :lslevel, :age, :category, :name, :quantity, :serials, :audio, :rcomments, :bcomments
  else
    b = Book.find(book[0].to_i)
    json.extract! b, :id, :rlevel, :lslevel, :age, :category, :name, :quantity, :serials, :audio, :rcomments, :bcomments
    json.keywords book[1][0].split(",")
  end
end