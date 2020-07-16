(ns analysis)

(with-open [rdr (clojure.java.io/reader "./input01.txt")]
  (map
    (fn [line] (->> line
                 (re-seq #".")
                 (reduce (fn [acc item]
                           (prn item)
                           (if (= "<" item) (inc acc) acc))
                   0)
                 )
         (line-seq rdr))
))
  ; (let [result (->>  (map #(re-seq #"." %)) (reduce (fn [acc item] (prn item) (if (= "<" item) (inc acc) acc)) 0))]  (prn "line" result "type" (type result))))
