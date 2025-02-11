"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowerService = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../shared/helpers/functions");
const coreConstant_1 = require("../../shared/helpers/coreConstant");
let FollowerService = class FollowerService {
    async makeFollower(user, payload) {
        try {
            const existsInstructor = await functions_1.PrismaClient.user.findFirst({
                where: {
                    id: payload.instructor_id,
                },
            });
            if (!existsInstructor) {
                return (0, functions_1.errorResponse)('Invalid Request!');
            }
            const isInstructor = await (0, functions_1.checkRoleIsValid)(existsInstructor.roles, coreConstant_1.coreConstant.ROLES.INSTRUCTOR);
            if (!isInstructor) {
                return (0, functions_1.errorResponse)('You can follow only instructor!');
            }
            if (user.id === payload.instructor_id) {
                return (0, functions_1.errorResponse)('You can not follow your self!');
            }
            const existsInstructorFollowingDetaials = await functions_1.PrismaClient.instructorFollower.findFirst({
                where: {
                    userId: user.id,
                    instructorId: existsInstructor.id,
                },
            });
            if (existsInstructorFollowingDetaials) {
                await functions_1.PrismaClient.instructorFollower.update({
                    where: {
                        id: existsInstructorFollowingDetaials.id,
                    },
                    data: {
                        following_status: existsInstructorFollowingDetaials.following_status ===
                            coreConstant_1.FollowingStatusConstant.FOLLOW
                            ? coreConstant_1.FollowingStatusConstant.UNFOLLOW
                            : coreConstant_1.FollowingStatusConstant.FOLLOW,
                    },
                });
            }
            else {
                await functions_1.PrismaClient.instructorFollower.create({
                    data: {
                        userId: user.id,
                        instructorId: payload.instructor_id,
                        following_status: coreConstant_1.FollowingStatusConstant.FOLLOW,
                    },
                });
            }
            return (0, functions_1.successResponse)('Following Status is changed successfully!');
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
    async getInstructorFollowerList(id, payload) {
        try {
            const paginate = await (0, functions_1.paginatioOptions)(payload);
            const followerList = await functions_1.PrismaClient.instructorFollower.findMany(Object.assign({ where: {
                    instructorId: id,
                }, include: {
                    Instructor: true,
                    Student: true,
                }, orderBy: {
                    created_at: 'desc',
                } }, paginate));
            const nonsensitiveData = followerList.map((follow) => {
                delete follow.Instructor.password;
                delete follow.Student.password;
                return follow;
            });
            const data = {
                list: nonsensitiveData,
                meta: await (0, functions_1.paginationMetaData)(followerList, payload),
            };
            return (0, functions_1.successResponse)('Follower list', data);
        }
        catch (error) {
            (0, functions_1.processException)(error);
        }
    }
};
FollowerService = __decorate([
    (0, common_1.Injectable)()
], FollowerService);
exports.FollowerService = FollowerService;
//# sourceMappingURL=follower.service.js.map