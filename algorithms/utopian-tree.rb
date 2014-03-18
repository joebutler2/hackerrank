def calc(n)
  i = 1
  1.upto(n) do |cn|
    cn % 2 == 1 ? i *= 2: i += 1
  end
  i
end

lines = $stdin.read.lines.to_a
lines.shift

lines.each do |n|
  puts calc(n.to_i)
end
