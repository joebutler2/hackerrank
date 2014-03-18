def insertion_sort(col)
  for i in 1...col.length
    j = i
    while j > 0 && col[j - 1] > col[j]
      t = col[j]
      col[j] = col[j - 1]
      col[j - 1] = t
      j -= 1
    end
  end
  col
end
numbers = [23,34,46,87,12,1,66]

puts insertion_sort(numbers)
