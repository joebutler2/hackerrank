#!/usr/bin/bash
ls -1 | ag target | sed 's/target//g' | xargs -I {} diff my-result-{} target{} || true
