###
Copyright (C) 2013, Jesus Perez <jesusprubio gmail com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
###
"use strict"

ShodanClient = require("../../lib/shodan.js")

options =
  key     : "YOURKEYHERE!!!!!!!!!!!!!!!!!!!!!!!!!",
  timeout : 10000

shodanClient = new ShodanClient(options)

console.log "\n------------------- your key -------------------"
console.log shodanClient.getKey()

shodanClient.count "apache", (data, err) ->
  console.log "\n------------------- count -------------------"
  if err
    console.log "ERROR: shodanClient.count: " + err
  else
    console.log data

shodanClient.host "1.1.1.1", (data, err) ->
  console.log "\n------------------- host -------------------"
  if err
    console.log "ERROR: shodanClient.host: " + err
  else
    console.log data

shodanClient.info (data, err) ->
  console.log "\n------------------- info -------------------"
  if err
    console.log "ERROR: shodanClient.count: " + err
  else
    console.log data

# A premium account is needed to get this info
shodanClient.locations "apache", (data, err) ->
  console.log "\n------------------- locations -------------------"
  if err
    console.log "ERROR: shodanClient.locations: " + err
  else
    console.log data

# Search targets
searchOptions =
  query: "asterisk"
  pageNumber: 1
  filters:
    port: 5060
# A premium account is needed in some cases, in the doc:
# " Uses 1 query credit if:
# - Page number > 1
# - Search query contains any of the following filters: city,
# country, net, geo, before, after, org, isp, title, html "
#searchOptions =
#    query: 'asterisk'
#    pageNumber: 1
#    filters:
#        port: 5060
#        country: 'es'
shodanClient.search searchOptions, (data, err) ->
  console.log "\n------------------- search -------------------"
  if err
    console.log "ERROR: shodanClient.search: " + err
  else
    console.log data