<script lang="ts">
	import ogImage from '$lib/images/iterm-aliases-trimmed-600.jpg';
	import { Highlight } from 'svelte-highlight';
	import bash from 'svelte-highlight/languages/bash';
	import Seo from '../../../components/Seo.svelte';

	import 'svelte-highlight/styles/github-dark.css';
</script>

<Seo
	description="Aliases can speed up your development and help you focus on code"
	title="Set up some aliases | Michael Bonner"
	{ogImage}
	ogType="article"
/>

<svelte:head>
	<meta property="article:published_time" content="2021-07-15T22:00:00.000Z" />
	<meta name="publish_date" property="og:publish_date" content="2021-07-15T22:00:00.000Z" />

	<link rel="canonical" href="https://michaelbonner.dev/blog/set-up-some-aliases" />
</svelte:head>

<div class="container mx-auto px-8 py-12">
	<div class="prose dark:prose-invert max-w-3xl">
		<div class="pt-8">
			<div class="lg:pt-24">
				<div>
					<h1>Set up some aliases</h1>
				</div>
			</div>
			<div class="lg:mt-32">
				<p>Bash aliases are amazing, just set them up.</p>
				<h2>What are bash aliases?</h2>
				<p>
					Bash aliases are shortcuts. They reduce the key strokes, and increase efficiency. You just
					type a short, easy to remember shortcut, and bash will execute the full command. Why type
					out <code>git status</code> when you could type <code>gs</code>? Whey type out
					<code>git checkout origin master</code>
					when you could just type <code>gcm</code>?
				</p>
				<h2>How to set them up</h2>
				<p>
					First, identify which version of shell you&apos;re using and where &apos;s configuration
					file is. Usually, on a mac, it&apos;s in a file at <code>~/.bash_profile</code>. I use
					zsh, so mine is at <code>~/.zshrc</code>. An easy way to test is to add a sample alias,
					and try executing it after refreshing the shell or sourcing your config file.
					<code>e.g. source ~/.zshrc</code>. I keep my aliases in a file at <code>~/.aliases</code>
					and then add <Highlight class="p-0" code="source ~/.aliases" language={bash} />
					<code>source ~/.aliases</code> to my <code>~/.zshrc</code>.
				</p>
				<p>
					Once you identify which file to edit, all you need to do is add something like the
					following:
				</p>
				<Highlight class="p-0" code="alias gs='git status'" language={bash} />
				<p>
					In the above example, `gs` is the text you will type, and the text in the quotes is the
					command that will be executed.
				</p>
				<h2>My aliases</h2>
				<p>Here are the aliases that I use</p>
			</div>
		</div>
	</div>
	<div class="max-w-7xl">
		<Highlight
			code={`# general
alias ll='ls -lah'
alias zshrc='vim ~/.zshrc'
alias hosts='sudo vim /etc/hosts'

# directories
alias dev='cd ~/Development'
alias projects='cd ~/Development/projects'

# git
alias mylog='git log --author="Michael Bonner" --pretty=format:"%aD : %s"'
alias gs='git status'
alias gb='git branch'
alias gpull='git pull'
alias gpul='gpull'
alias gpo='git pull origin'
alias gp='git pull'
alias gpush='git push'
alias gf='git fetch'
alias gl2="git log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n''          %C(white)%s%C(reset) %C(dim white)- %an%C(reset)' --all"
alias gl="git log --graph --abbrev-commit --decorate --date=relative --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all"
alias gcm='git checkout main'
alias gcma='git checkout master'
alias gcd='git checkout development'
alias gcs='git checkout staging'
alias gpma='git pull origin master'
alias gpm='git pull origin main'
alias gpd='git pull origin development'
alias gps='git pull origin staging'
alias ga='git add .'
alias gc='git commit -m '
alias gac='git commit -am '
alias gc--.='git checkout -- .'
alias gch='git checkout'
alias gclean='git reset --hard;git clean -df;'
alias ghash='git rev-parse HEAD | pbcopy'
alias gt='bunx git-trim'
alias gr='git rebase'
alias g='lazygit'
alias gw='git worktree'
alias gwl='git worktree list'
alias gwa='git worktree add'
alias gwr='git worktree remove'
alias groma='git rebase origin/master'
alias grom='git rebase origin/main'

# laravel
alias sup='sail up'
alias sdo='sail down'
alias pa='sail artisan'
alias mfs='sail artisan queue:clear; sail artisan migrate:fresh --seed'
alias cda='composer dump-autoload'
alias sail='./vendor/bin/sail'
alias sa='sail artisan'
alias sc='sail composer'
alias pest='vendor/bin/pest'
alias unit="./vendor/bin/phpunit"
alias pint="./vendor/bin/pint"

# npm : requires ni (https://github.com/antfu-collective/ni)
alias nrt='nr test'
alias nrl='nr lint'
alias nrd='nr dev'
alias nrb='nr build'
alias nrs='nr start'
alias nout='na outdated'
alias nrg='nr generate'
alias nrc='nr codegen'

# docker
alias dcu='docker compose up'
alias dcd='docker compose down'
alias dps='docker ps'
alias dpa='docker ps -a'

# deployments
alias vl='vercel ls'

# misc
alias c='open . -a /Applications/Cursor.app'
alias k='kiro .'
alias st='open . -a /Applications/Sourcetree.app'
alias vim='lvim'
alias speedtest='bunx speed-cloudflare-cli'
`}
			language={bash}
		/>
	</div>

	<div class="prose dark:prose-invert mt-16 max-w-3xl">
		<p>
			Published:
			<time dateTime="2021-07-15">15 Jul 2021</time>
		</p>
		<p>
			Updated:
			<time dateTime="2025-10-09">09 Oct 2025</time>
		</p>
	</div>
</div>
