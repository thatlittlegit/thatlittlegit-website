#!/bin/sh
while echo -n 'phone> ' && read in
do
	if [ -z "$in" ]
	then
		echo -n '' # nop
	elif [ "$in" = "q" ]
	then
		exit
	elif [ "$in" = "license" ]
	then
		echo "phone-cli is (c) 2018 thatlittlegit, and is under the GNU General Public License, 3.0 or higher."
	else
		fields=`echo $in | sed 's/[^ ]//g' | wc -c`
		contact=`echo $in | cut -d' ' -f1`
		field=`echo $in | cut -d' ' -f2`

		readfromout() {
			cat -n ~/contacts | sed 's/^ *//g' | grep "^$contact"
		}

		if [ -z "$(readfromout)" ]
		then
			echo "entry not found"
		elif [ $fields -eq 1 ]
		then
			readfromout | cut -f2-4
		else
			if [ "$field" = "name" ]
			then
				readfromout | cut -f2
			elif [ "$field" = "phone" ]
			then
				readfromout | cut -f3
			elif [ "$field" = "site" ]
			then
				readfromout | cut -f4
			else
				echo "field not found"
			fi
		fi
	fi
done
