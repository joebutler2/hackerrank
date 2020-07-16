(ns analysis.core)

(defn- count-line [line label character]
  (let [char-count (->> line
       (re-seq #".")
       (reduce (fn [acc item]
                 (if (re-matches character item) (inc acc) acc))
               0)
       )] 
    (if-not (nil? char-count) (prn label "count" char-count))
    ))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]

  (with-open [rdr (clojure.java.io/reader (first args))]
    (doall
      (map
        (fn [line]
          (count-line line "HOME" #"<")
          (count-line line "BACKSPACE" #"\*")
          (count-line line "NUM_LOCK" #"#")
          (count-line line "END" #">")
          (if-let [in-num-lock (re-seq #"#.*#" line)]
            (prn "Numbers ignored" (count (re-seq #"\d" (first in-num-lock)))))
          (count-line line "Word characters (alphanumeric and underscore" #"\w")
          (count-line line "Characters" #"[A-Za-z]")
          (count-line line "Underscores" #"\_")
          (count-line line "Digit" #"\d"))
        (line-seq rdr)
))))
