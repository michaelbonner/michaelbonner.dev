import Layout from "../../components/layout";

export default function SetUpSomeAliases() {
  return (
    <Layout
      title="Set up some aliases | Michael Bonner"
      description="Aliases can speed up your development and help you focus on code"
    >
      <main className="container mx-auto px-8 py-12 flex items-center">
        <div className="max-w-3xl prose dark:prose-invert">
          <div className="pt-8">
            <div className="lg:pt-24">
              <div>
                <h1 className="leading-relaxed text-4xl tracking-wide lg:pr-8">
                  Set up some aliases
                </h1>
              </div>
            </div>
            <div className="lg:mt-32 text-lg max-w-5xl">
              <p>Bash aliases are amazing, just set them up.</p>
              <h2>What are bash aliases?</h2>
              <p>
                Bash aliases are shortcuts. They reduce the key strokes, and
                increase efficiency. You just type a short, easy to remember
                shortcut, and bash will execute the full command. Why type out{" "}
                <code>git status</code> when you could type <code>gs</code>?
                Whey type out <code>git checkout origin master</code> when you
                could just type <code>gcm</code>?
              </p>
              <h2>How to set them up</h2>
              <p>
                First, identify which version of shell you&apos;re using and
                where &apos;s configuration file is. Usually, on a mac,
                it&apos;s in a file at <code>~/.bash_profile</code>. I use zsh,
                so mine is at <code>~/.zshrc</code>. An easy way to test is to
                add a sample alias, and try executing it after refreshing the
                shell or sourcing your config file.{" "}
                <code>e.g. source ~/.zshrc</code>. I keep my aliases in a file
                at <code>~/.aliases</code> and then add{" "}
                <code>source ~/.aliases</code> to my <code>~/.zshrc</code>.
              </p>
              <p>
                Once you identify which file to edit, all you need to do is add
                something like the following:
              </p>
              <pre>alias gs=&apos;git status&apos;</pre>
              <p>
                In the above example, `gs` is the text you will type, and the
                text in the quotes is the command that will be executed.
              </p>
              <h2>My aliases</h2>
              <p>Here are the aliases that I use</p>
              <pre className="whitespace-pre-wrap">
                {`
# general
alias ll='ls -la'
alias hosts='sudo vim /etc/hosts'
alias dev='cd ~/Development'
alias projects='cd ~/Development/projects'

# git
alias mylog='git log --author="Michael Bonner" --pretty=format:"%aD : %s"'
alias gs='git status'
alias gb='git branch'
alias gpull='git pull'
alias gpo='git pull origin'
alias gp='git pull'
alias gpush='git push'
alias gf='git fetch'
alias gl="git log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n''          %C(white)%s%C(reset) %C(dim white)- %an%C(reset)' --all"
alias gl2="git log --graph --abbrev-commit --decorate --date=relative --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all"
alias gcma='git checkout master'
alias gcd='git checkout development'
alias gcs='git checkout staging'
alias gcm='git checkout mike'
alias gmma='git merge master'
alias gmd='git merge development'
alias gms='git merge staging'
alias gmm='git merge mike'
alias gpma='git pull origin master'
alias gpd='git pull origin development'
alias gps='git pull origin staging'
alias gpm='git pull origin mike'
alias ga='git add .'
alias gc='git commit -m '
alias gac='git commit -am '
alias ggs='find . -type d -name '.git' -maxdepth 3 | while read dir ; do sh -c "cd $dir/../ && echo -e \"\nGIT STATUS IN $&#123;dir//\.git/&#125;\" && git status -s" ; done'
alias gc--.='git checkout -- .'
alias gch='git checkout'
alias gclean='git reset --hard;git clean -df;'
alias ghash='git rev-parse HEAD | pbcopy'
alias grpo='git remote prune origin'

# laravel
alias pa='sail artisan'
alias mfs='sail artisan queue:clear; sail artisan migrate:fresh --seed'
alias cda='sail composer dump-autoload'
alias sail='./vendor/bin/sail'
alias sa='sail artisan'

#ionic
alias ib='ionic build'
alias is='ionic serve'

#npm
alias nr='npm run'
alias nrs='npm run start'
alias nrss='npm run start-secure'
alias nrd='npm run dev'
alias nrt='npm run test'
alias nrw='npm run watch'
alias nrp='npm run prod'
alias nrb='npm run build'

# misc
alias unit="./vendor/bin/phpunit"
alias sf='sudo mdutil -E /'
alias vapor='php vendor/bin/vapor'
alias c='code .'
alias ploys='./bin/deploy-staging.sh'
alias ployp='./bin/deploy-production.sh'
alias st='open . -a /Applications/Sourcetree.app'
alias da='SwitchAudioSource -t input -s "Yeti X" && SwitchAudioSource -t output -s "Mike’s Beats"'
`}
              </pre>
              <p className="mt-16">
                Published:{` `}
                <time dateTime="2021-07-15">15 Jul 2021</time>
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
