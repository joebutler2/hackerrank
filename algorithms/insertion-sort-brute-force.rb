def insertion_sort_count(col)
  count = 0
  for i in 1...col.length
    j = i
    while j > 0 && col[j - 1] > col[j]
      t = col[j]
      col[j] = col[j - 1]
      col[j - 1] = t
      j -= 1
      count += 1
    end
  end
  count
end

lines = $stdin.read.lines.to_a
lines.shift

lines.each_with_index do |line, index|
  next if index % 2 == 0
  elems = line.chomp.split(/ /).map(&:to_i)
  puts insertion_sort_count(elems)
end
