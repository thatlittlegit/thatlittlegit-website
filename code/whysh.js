// Note: this could probably be done faster with libraries.
// I'm doing this with only Node.

const rl = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

// Parse the file
const file = require('fs').readFileSync(require('path').join(require('os').homedir(), 'contacts'), 'utf-8');
const contacts = file.split('\n').map((line) => line.split('\t')).map((contact) => ({
	name: contact[0],
	phone: contact[1],
	site: contact[2]
}));

function main() {
	rl.question('phone> ', (input) => {
		if (input === '') {
		} else if (input === 'q') {
			process.exit(0);
		} else if (input === 'license') {
			console.log('phone-cli is (c) 2018 thatlittlegit, and is under the GNU General Public License, 3.0 or higher.');
		} else {
			const contact = contacts[Number(input.split(' ')[0]) - 1];
			const split = input.split(' ');

			if (typeof contact === 'undefined') {
				console.error('entry not found');
			} else if (split.length === 1) {
				// They need a line
				console.log(file.split('\n')[Number(input.split(' ')[0]) - 1]);
			} else {
				// They need a field
				switch (split[1]) {
				case 'name':
					console.log(contact.name);
					break;
				case 'phone':
					console.log(contact.phone);
					break;
				case 'site':
					console.log(contact.site);
					break;
				default:
					console.error('field not found');
				}
			}
	}
	main();
	});
}

main();
