json.extract! book, :id, :rlevel, :lslevel, :age, :category, :name, :quantity, :serials, :audio
json.keywords do
  json.array! book.keywords.pluck :content
end