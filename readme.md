# Codocil, a supplement to termocil

(Itermocil)[https://github.com/TomAnthony/itermocil] "
iTermocil allows you to setup pre-configured layouts of windows and panes in iTerm2." Codocil automates the creation of itermocil files for javascript projects (more languages to be added on request). It also wraps some Itermocil functionality for ease of use.

## Installation

Install (Itermocil)[https://github.com/TomAnthony/itermocil]

```
$ brew update
$ brew install TomAnthony/brews/itermocil
```

Then

## Usage

Point `Codocil init -r` at the root of your developer directory and all folders that have a known project identifier (excluding node_modules/\*, my goodness could you imagine?) will be given an itermocil document. The termocil configuration will have two panes, one for git and one for your server.

Codocil currently only recognizes javascript, though I plan to extend it to work with other languages as well.

code as configuration

## Autocomplete

This section has been slightly modified from its complement in (itermocil)[https://github.com/TomAnthony/itermocil#shell-autocompletion].

To get autocompletion when typing codocil <Tab>

### In Zsh

`echo 'compctl -g \'~/.itermocil/.codocil/*(:t:r)\' codocil' >> .zshrc`

The following have not been tested:

### In Bash

To get autocompletion when typing codocil <Tab> in a bash session, add this line to your ~/.bashrc file:

`complete -W "\$(codocil --cmpl)" codocil`

### In fish

To get autocompletion when typing codocil <Tab> in a fish session, add this line to your ~/.config/fish/config.fish file:

`complete -c codocil -a "(codocil --cmpl)"`

# TODOs

- name collision resolution

## Tests

- use mock-js
- finish testing completions
- - add test project, expect op to include it
-
