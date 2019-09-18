"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const inversify_1 = require("inversify");
const decorators_1 = require("../constants/decorators");
let SearchService = class SearchService {
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const moviesWithMatchingTitle = yield this._movieRepository.findManyByQuery({
                title: {
                    $regex: new RegExp(query, "ig")
                }
            });
            const matchingActors = yield this._actorRepository.findManyByQuery({
                name: {
                    $regex: new RegExp(query, "ig")
                }
            });
            const matchingDirectors = yield this._directorRepository.findManyByQuery({
                name: {
                    $regex: new RegExp(query, "ig")
                }
            });
            const getMovieIds = (arr) => {
                return arr.map(i => i.movies).reduce((p, c) => [...p, ...c], []);
            };
            const moviesIdsWithMatchingDirector = getMovieIds(matchingDirectors);
            const movieIdsWithMatchingActor = getMovieIds(matchingActors);
            const movieIdsWithMatchingActorOrDirector = [
                ...moviesIdsWithMatchingDirector,
                ...movieIdsWithMatchingActor
            ];
            const moviesWithMatchingActorOrDirector = yield this._movieRepository.findManyById(movieIdsWithMatchingActorOrDirector);
            const matchingMovies = [
                ...moviesWithMatchingTitle,
                ...moviesWithMatchingActorOrDirector
            ];
            return matchingMovies;
        });
    }
};
__decorate([
    decorators_1.movieRepository,
    __metadata("design:type", Object)
], SearchService.prototype, "_movieRepository", void 0);
__decorate([
    decorators_1.actorRepository,
    __metadata("design:type", Object)
], SearchService.prototype, "_actorRepository", void 0);
__decorate([
    decorators_1.directorRepository,
    __metadata("design:type", Object)
], SearchService.prototype, "_directorRepository", void 0);
SearchService = __decorate([
    inversify_1.injectable()
], SearchService);
exports.default = SearchService;
//# sourceMappingURL=search_service.js.map