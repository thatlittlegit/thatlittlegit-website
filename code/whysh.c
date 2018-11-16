// Note: This program only supports contact-paths below 32 bytes, contact-files
// of 8192, 128 bytes of command and 512 contacts.
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define strsta(x, y) strstr(x, y) - x == 0
#define strcomp(x, y) strcmp(x, y) == 0

int strcon(char needle, char* haystack) {
	int i, ret = 0;
	for (i = 0; i < strlen(haystack); i++) {
		if (haystack[i] == needle) ret++;
	}
	return ret;
}

struct contact {
	char* name;
	char* number;
	char* address;
};

int main() {
	char* contactsloc = malloc(32);
	snprintf(contactsloc, 32, "%s/contacts", getenv("HOME"));
	FILE* contactfd = fopen(contactsloc, "r");

	if (errno != 0) return printf("%s", strerror(errno)) % 1 + 1;
	free(contactsloc);

	struct contact contacts[512];

	int i = 1; // more user-friendly
	char* line = malloc(8192);
	char* chunk;
	while (fgets(line, 8192, contactfd)) {
		struct contact tmp = { "", "", "" };
		int j;

		for (j = 0; (chunk = strtok(line, "\t")) != NULL; j++, line = NULL) {
			if (j == 0)
				tmp.name = chunk;
			else if (j == 1)
				tmp.number = chunk;
			else if (j == 2)
				tmp.address = chunk;
		}

		contacts[i++] = tmp;
		line = malloc(8192);
	}

	fclose(contactfd);
	free(line);
	free(chunk);

	char* in = malloc(128);
	fprintf(stderr, "phone> ");
	while (fgets(in, 128, stdin)) {
		if (strcomp(in, "q\n")) {
			exit(0);
		} else if (strcomp(in, "license\n")) {
			puts("phone-cli is (c) 2018 thatlittlegit, and is under \
the GNU General Public License, 3.0 or \
higher.");
		} else {
			if (atoi(in) != 0 || strsta("0", in)) {
				int contact = atoi(in);

				if (contacts[contact].name != NULL) {
					if (strcon(' ', in) == 0) {
						printf("%s\t%s\t%s", contacts[contact].name, contacts[contact].number, contacts[contact].address);
					} else {
						int i;
						char* inp = malloc(128);
						char* part = malloc(128);
						strcpy(inp, in);

						for (i = 0; (part = strtok(inp, " ")); inp = NULL, i++) {
							if (i == 1) {
								if (strcomp(part, "name\n"))
									printf("%s\n", contacts[contact].name);
								else if (strcomp(part, "phone\n"))
									printf("%s\n", contacts[contact].number);
								else if (strcomp(part, "site\n"))
									// newline is already in site address
									printf("%s", contacts[contact].address);
								else
									puts("field not found");
							}
						}
					}
				} else {
					puts("entry not found");
				}
			}
		}
		fprintf(stderr, "phone> ");
	}
}
