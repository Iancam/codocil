#!/usr/bin/env zsh

_codocil_complete() {
  local word completions
  word="$1"
  completions="$(codocil --cmpl "${word}")"
  reply=( "${(ps:\n:)completions}" )
}

compctl -K _codocil_complete codocil