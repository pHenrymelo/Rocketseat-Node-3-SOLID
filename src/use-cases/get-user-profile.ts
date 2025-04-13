import type { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import type { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseReply {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: PrismaUsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseReply> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
