#!/bin/sh
ng build --prod --output-path=dist
firebase deploy
