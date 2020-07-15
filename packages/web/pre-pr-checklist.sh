
#!/bin/bash

declare -a ChecklistArray=(
  "Have you run the linter?"
  "Has the copy been proof read?"
  "Have the modifications been checked in firefox and safari?"
)


for entry in "${ChecklistArray[@]}"
do
  echo $entry
  select yn in "Yes" "No"; do
    echo "Selected: $yn"
    case $yn in
        Yes ) break;;
        No ) echo "complete this step and come back"; exit;;
    esac
  done
done

echo "Pre PR checklist complete"