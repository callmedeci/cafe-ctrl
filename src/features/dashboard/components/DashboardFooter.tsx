import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet } from '@/components/ui/sheet';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ProfileContent } from '@/features/profile';
import { getUser } from '@/supabase/data/user-service';
import { getLocale } from 'next-intl/server';
import Logout from './Logout';
import UserMenuNav from './UserMenuNav';

async function DashboardFooter() {
  const user = await getUser();
  if (!user) throw new Error();

  const locale = await getLocale();
  const isFa = locale === 'fa';

  const userInitials =
    user?.email?.split('@')[0].slice(0, 2).toUpperCase() || 'U';

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Sheet>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger
              asChild
              className='group h-12 hover:!bg-inherit'
            >
              <SidebarMenuButton>
                <div className='flex w-48 flex-1 items-center gap-2'>
                  <div className='relative'>
                    <Avatar>
                      <AvatarImage
                        src={user.user_metadata?.picture}
                        alt={'User profile'}
                      />
                      <AvatarFallback className='bg-primary/5 text-primary text-xs font-semibold'>
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className='border-background bg-primary absolute -right-0.5 -bottom-1 h-3 w-3 animate-pulse rounded-full border-2'></div>
                  </div>
                  <span className='truncate'>{user.email}</span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side='top'
              align={isFa ? 'start' : 'end'}
              className='w-64 p-2'
            >
              <DropdownMenuItem className='hover:!bg-transparent'>
                <div
                  className={`flex items-center gap-2 ${isFa ? 'flex-1 flex-row-reverse' : ''}`}
                >
                  <Avatar>
                    <AvatarImage
                      src={user.user_metadata?.picture}
                      alt={'User profile'}
                    />
                    <AvatarFallback className='bg-primary/5 text-primary font-semibold'>
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex w-48 flex-col'>
                    <span
                      className={`${isFa ? 'text-end' : ''} truncate text-sm font-medium`}
                    >
                      {user.user_metadata.full_name ||
                        user.email!.split('@').at(0)}
                    </span>
                    <span className='text-muted-foreground truncate text-xs'>
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <UserMenuNav />

              <DropdownMenuSeparator />

              <Logout />
            </DropdownMenuContent>
          </DropdownMenu>

          <ProfileContent user={user} />
        </Sheet>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default DashboardFooter;
