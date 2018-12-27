# Codocil, a supplement to termocil

Itermocil is great. Truly wonderful. I am truly lazy. Termocil wasn't enough automation, so I created codocil to automate the creation of projects.

Point `Codocil init -r` at the root of your developer directory and all folders that have a known project identifier (excluding node_modules/\*, my goodness could you imagine?) will be given an itermocil document. The termocil configuration will have two panes, one for git and one for your server.

Codocil currently only recognizes javascript, though I plan to extend it to work with other languages as well.

code as configuration

# TODOs

- codocil init
- integrate with existing itermocil files in
  - the root directory
  - project directories
    - symlink
- add autocompletion, and run commands
