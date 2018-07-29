json.array! @books do |book|
  # {"63"=>["phone,phone,teeny-tiny,flash,statuesque,toy,throat,addicted"]}
  b = Book.find(book[0].to_i)
  json.extract! b, :id, :rlevel, :lslevel, :age, :category, :name, :quantity, :serials, :audio, :rcomments, :bcomments, :created_at, :updated_at
  json.keywords book[1][0].split(",")
end