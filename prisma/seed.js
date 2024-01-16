"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_server_1 = require("../src/utils/db.server");
const client_1 = require("@prisma/client");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const activity1 = yield db_server_1.db.activity.create({
            data: {
                thumbnail: "https://drive.google.com/uc?export=view&id=1A0-eko_JOg05wLW8EWHGdhitn7yVJKEm",
                title: "Internal Program",
                date: new Date(2024, 0, 1),
                caption: "This is the internal program caption",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies.",
                type: client_1.ActivityType.internal,
                documentation: {
                    create: [
                        {
                            title: "Documentation 1",
                            url: "https://example.com/doc1.pdf"
                        },
                        {
                            title: "Documentation 2",
                            url: "https://example.com/doc2.pdf"
                        }
                    ]
                }
            }
        });
        const activity2 = yield db_server_1.db.activity.create({
            data: {
                thumbnail: "https://drive.google.com/uc?export=view&id=1u0c6qzdcb-__UHjwK7HqB_v5x0HiD4Ma",
                title: "External Program",
                date: new Date(2024, 0, 2),
                caption: "This is the external program caption",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies.",
                type: client_1.ActivityType.external,
                documentation: {
                    create: [
                        {
                            title: "Documentation 3",
                            url: "https://example.com/doc3.pdf"
                        },
                        {
                            title: "Documentation 4",
                            url: "https://example.com/doc4.pdf"
                        }
                    ]
                }
            }
        });
        const activity3 = yield db_server_1.db.activity.create({
            data: {
                thumbnail: "https://drive.google.com/uc?export=view&id=1QfvrINL2ODJRlye1XFyT_ZMNG7DXuwcO",
                title: "Learning Program",
                date: new Date(2024, 0, 3),
                caption: "This is the Learning program caption",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies.",
                type: client_1.ActivityType.learning,
                documentation: {
                    create: [
                        {
                            title: "Documentation 5",
                            url: "https://example.com/doc5.pdf"
                        },
                        {
                            title: "Documentation 6",
                            url: "https://example.com/doc6.pdf"
                        }
                    ]
                }
            }
        });
        const activity4 = yield db_server_1.db.activity.create({
            data: {
                thumbnail: "https://drive.google.com/uc?export=view&id=16WhNbkh-rvfh2_CrKZKarB5ppsSihQ9c",
                title: "Project Program",
                date: new Date(2024, 0, 4),
                caption: "This is the Project program caption",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies.",
                type: client_1.ActivityType.project,
                documentation: {
                    create: [
                        {
                            title: "Documentation 7",
                            url: "https://example.com/doc7.pdf"
                        },
                        {
                            title: "Documentation 8",
                            url: "https://example.com/doc8.pdf"
                        }
                    ]
                }
            }
        });
        console.log({ activity1, activity2, activity3, activity4 });
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_server_1.db.$disconnect();
}));
